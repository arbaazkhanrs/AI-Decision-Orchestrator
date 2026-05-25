using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Backend.Services
{
    public class GeminiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _apiUrl;

        public GeminiService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            if (!_httpClient.DefaultRequestHeaders.Contains("User-Agent"))
            {
                _httpClient.DefaultRequestHeaders.Add("User-Agent", "aistudio-build");
            }
            _apiKey = configuration["Gemini:ApiKey"] ?? throw new ArgumentNullException("Gemini ApiKey is missing");
            _apiUrl = configuration["Gemini:ApiUrl"] ?? "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
        }

        public async Task<T> GenerateJsonAsync<T>(string prompt)
        {
            var requestBody = new
            {
                contents = new[]
                {
                    new 
                    { 
                        role = "user",
                        parts = new[] { new { text = prompt } } 
                    }
                },
                generationConfig = new
                {
                    responseMimeType = "application/json"
                }
            };

            var jsonRequest = JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_apiUrl}?key={_apiKey}", content);

            if (!response.IsSuccessStatusCode)
            {
                var errorBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"[Gemini Error] Status: {response.StatusCode}, Body: {errorBody}");
                throw new Exception($"Gemini API Error ({response.StatusCode}): {errorBody}");
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();
            JObject? dynamicResponse;
            try
            {
                dynamicResponse = JsonConvert.DeserializeObject<JObject>(jsonResponse);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[Gemini Error] Failed to parse API response as JObject: {ex.Message}. Response: {jsonResponse}");
                throw new Exception($"Failed to parse Gemini API response: {ex.Message}");
            }
            
            var text = dynamicResponse?["candidates"]?[0]?["content"]?["parts"]?[0]?["text"]?.ToString();
            
            if (string.IsNullOrEmpty(text))
            {
                Console.WriteLine($"[Gemini Error] No text content found in response. Full Response: {jsonResponse}");
                throw new Exception("Empty response from Gemini (check for safety filters)");
            }

            // Robust JSON extraction: Find the first '{' and the last '}'
            int firstBrace = text.IndexOf('{');
            int lastBrace = text.LastIndexOf('}');

            if (firstBrace != -1 && lastBrace != -1 && lastBrace > firstBrace)
            {
                text = text.Substring(firstBrace, lastBrace - firstBrace + 1);
            }

            try
            {
                // Use System.Text.Json for the returned object so ASP.NET Core can serialize it correctly
                var options = new System.Text.Json.JsonSerializerOptions { 
                    PropertyNameCaseInsensitive = true,
                    AllowTrailingCommas = true,
                    ReadCommentHandling = System.Text.Json.JsonCommentHandling.Skip
                };
                return System.Text.Json.JsonSerializer.Deserialize<T>(text, options) ?? throw new Exception("Deserialized object was null");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[Gemini Error] Failed to deserialize agent JSON: {ex.Message}. Text content: {text}");
                throw new Exception($"Agent parsing failed: {ex.Message}");
            }
        }
    }
}
