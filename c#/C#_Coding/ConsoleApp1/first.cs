using System;
using System.Collections.Generic;

namespace ConsoleApp1
{
    class First
    {
        static void Main(string[] args)
        {
            //Console.WriteLine("Hello World");
            float x = 7.000f;
            double y = 3;
            int? i = null;
            double salary = 45678.90;
            decimal balance = 100000.75m;
            //Console.WriteLine(y);
            //Console.WriteLine(x);
            //Console.WriteLine(balance);
            Console.WriteLine($"x: {x}, salary: {salary}, balance: {balance}");
            //Console.ReadLine();
            string name = "John";
            Console.WriteLine("Hello " + name);
            DateTime createdAt = DateTime.Now;
            Console.WriteLine("Created at: " + createdAt);
            Guid id = Guid.NewGuid();
            Console.WriteLine(id);
            Console.WriteLine(i);
            int? age = null;

            if (age.HasValue)
            {
                Console.WriteLine(age.Value);
            }
            else
            {
                Console.WriteLine("Age is null");
            }

            Stringcpt obj = new Stringcpt();
            obj.Print();
        }
    }
}
