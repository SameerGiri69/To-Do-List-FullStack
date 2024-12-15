namespace test.DTOs.ResponseDTOs
{
    public class GetUserTaskResponseDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public bool? isCompleted { get; set; }
    }
}
