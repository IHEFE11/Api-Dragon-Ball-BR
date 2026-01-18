using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
public class Person{
    public int Id { get; set; } 
    public string Name { get; set; } 
    public string Race { get; set; }  
    public string Gender { get; set; }
    public string Description { get; set; }
    public string imagemUrl  { get; set; }
    }   
}