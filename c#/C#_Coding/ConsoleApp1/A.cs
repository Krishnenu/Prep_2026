using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleApp1
{
    public class A
    { 
        public void MethodA()
        {
            Console.WriteLine("MethodA in class A");
        }
        private void MethodB()
        {
            Console.WriteLine("Private MethodA in class A");
        }
        internal void MethodC()
        {
            Console.WriteLine("Internal MethodA in class A");
        }
         protected void MethodD()
         {
                Console.WriteLine("Protected MethodA in class A");
         }
        internal protected void MethodE()
        {
            Console.WriteLine("Internal Protected MethodA in class A");
        }

        public static void Main()
        {
           
        }
    }
}
