using System;

namespace Todo_with_React_NetCore
{
    public class ToDoModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsDone { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? EditedAt { get; set; }

        public DateTime? DateConclusion { get; set; }


    }
}