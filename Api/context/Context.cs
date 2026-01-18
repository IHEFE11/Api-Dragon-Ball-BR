using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Context
{
    public class appContext : DbContext
    {
        public appContext(DbContextOptions<appContext> options) : base(options)
        {
        }
        public DbSet<Person> Persons {get; set;}
    }

}