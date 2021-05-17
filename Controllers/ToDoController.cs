using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Todo_with_React_NetCore;

namespace ToDoApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
 public class ToDoController : ControllerBase
    {
//lista privada do tipo ToDoModel 
 private static List<ToDoModel> Tasks = new List<ToDoModel>
        {
 new ToDoModel{
 Id = Guid.Parse("4CA27A99-5E15-4BFF-A6D4-C295BF443E2D"),
 Name = "Task 1",
 IsDone = true,
 CreatedAt = new DateTime(2020,05,20),
 EditedAt = new DateTime(2020,05,21),
 DateConclusion = new DateTime(2020,05,22)
             },
 new ToDoModel{
 Id = Guid.Parse("03976BE1-D1E4-4690-807D-5D058E09E235"),
 Name = "Task 2",
 IsDone = false,
 CreatedAt = DateTime.Now,
             }
        };

        [HttpGet]
 public List<ToDoModel> Get()
        {
 return Tasks;
        }

        [HttpPost]
 public IActionResult Post(ToDoModel task)
        {
 task.Id = Guid.NewGuid();
 task.CreatedAt = DateTime.Now;
 Tasks.Add(task);
 return Ok();
        }

        [HttpPut("{id}")]
 public IActionResult Put(Guid id, ToDoModel task)
        {
 foreach (var item in Tasks)
            {
 if (item.Id == id)
                {
 item.Name = task.Name;
 item.EditedAt = DateTime.Now;
                }
            }
 return Ok();
        }

        [HttpPatch("{id}")]
 public IActionResult Patch(Guid id)
        {
 foreach (var item in Tasks)
            {
 if (item.Id == id)
                {
 item.IsDone = !item.IsDone;
 item.EditedAt = DateTime.Now;

 if (item.IsDone)
                    {
 item.DateConclusion = DateTime.Now;
                    }
 else
 item.DateConclusion = null;
                }
            }
 return Ok();
        }

        [HttpDelete("{id}")]
 public IActionResult Delete(Guid id)
        {
 var elementToRemove = Tasks.FirstOrDefault(f => f.Id == id);
 Tasks.Remove(elementToRemove);
 return Ok();
        }
    }
}