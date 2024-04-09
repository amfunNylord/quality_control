using System.Diagnostics;

string[] lines = File.ReadAllLines("tests.txt");

foreach (string s in lines)
{
    string[] lineParams = s.Split(" ");
    using Process process = new Process
    {
        StartInfo = new ProcessStartInfo
        {
            FileName = "Triangle.exe",
            WorkingDirectory = @"", // Путь к рабочей директории приложения
            Arguments = $"{lineParams[0]} {lineParams[1]} {lineParams[2]} >output.txt",
            UseShellExecute = false,
            RedirectStandardOutput = true
        }
    };

    process.Start();
    process.WaitForExit(); // Дождаться завершения процесса

    
    string output = process.StandardOutput.ReadToEnd();

    if (lineParams[3] == output.Trim())
    {
        await File.AppendAllTextAsync("result.txt", "success\n");
    }
    else
    {
        await File.AppendAllTextAsync("result.txt", "error\n");
    }
}