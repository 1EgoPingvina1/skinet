namespace API.Errors
{
    public class ApiValidationErrorResonse : ApiResponse
    {
        public IEnumerable<string> Errors { get; set; }
        public ApiValidationErrorResonse() : base(400)
        {
            
        }
    }
}
