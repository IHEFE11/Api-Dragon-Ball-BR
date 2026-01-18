using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Context;
using Api.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
        
        public class PersonController : ControllerBase
    {
        private readonly appContext _context;
        public PersonController(appContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult Create(Person person)
        {
            _context.Add(person);
            _context.SaveChanges();
            return Ok(person);
        }
        [HttpGet("{Id}")]
        public IActionResult ObterPorId(int Id)
        {
            var person = _context.Persons.Find(Id);
            if (person == null)
                return NotFound();
            
            return Ok(person);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, Person person)
        {
           
            var personBanco = _context.Persons.Find(id);

            if (personBanco == null)
                return NotFound();

          
            personBanco.Name = person.Name;
            personBanco.Race = person.Race;
            personBanco.Gender= person.Gender;
            personBanco.Description = person.Description;
            personBanco.imagemUrl = person.imagemUrl;
         
           
            _context.Persons.Update(personBanco);
            _context.SaveChanges();

            return Ok(personBanco);
        }

        // --- DELETE (Deletar) ---
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           
            var person = _context.Persons.Find(id);

            if (person == null)
                return NotFound();

           
            _context.Persons.Remove(person);
            _context.SaveChanges();

            return NoContent(); 
        }
    }
}

