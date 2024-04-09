using System.Diagnostics;
using System;

if (args.Length != 3)
{
    Console.WriteLine("Неизвестная ошибка");
    Environment.Exit(0);
}

int a = 0, b = 0, c = 0;
if (!(int.TryParse(args[0], out a) && int.TryParse(args[1], out b) && int.TryParse(args[2], out c)))
{
    Console.WriteLine("Неизвестная оишбка");
    Environment.Exit(0);
}

if (a + b < c || a + c < b || b + c < a)
{
    Console.WriteLine("Не треугольник");
    Environment.Exit(0);
}

if (a == b && b == c)
{
    Console.WriteLine("Равносторонний");
    Environment.Exit(0);

}

if (a == b || b == c || a == c)
{
    Console.WriteLine("Равнобедренный");
    Environment.Exit(0);
}

Console.WriteLine("Обычный");