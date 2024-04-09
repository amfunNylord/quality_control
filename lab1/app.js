if (process.argv.length != 5 || isNaN(parseInt(process.argv[2])) || isNaN(parseInt(process.argv[3])) || isNaN(parseInt(process.argv[2])) || process.argv[2] <= 0 || process.argv[3] <= 0 || process.argv[4] <= 0 || process.argv[2] > Number.MAX_SAFE_INTEGER || process.argv[3] > Number.MAX_SAFE_INTEGER || process.argv[4] > Number.MAX_SAFE_INTEGER)
{
    console.log('Неизвестная_ошибка');
    process.exit(0);
}

const a = parseInt(process.argv[2]);
const b = parseInt(process.argv[3]);
const c = parseInt(process.argv[4]);

if (a + b <= c || a + c <= b || b + c <= a)
{
    console.log('Не_треугольник');
    process.exit(0);
}

if (a == b  && b == c)
{
    console.log('Равносторонний');
    process.exit(0);
}

if (a == b || b == c || a == c)
{
    console.log('Равнобедренный');
    process.exit(0);
}

console.log('Обычный');