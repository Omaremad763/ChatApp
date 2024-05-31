using ChatApp_SignalR;
using ChatApp_SignalR.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddSingleton<IDictionary<string,UserConneection>>(options=>new Dictionary<string, UserConneection>());


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
    });




// Add services to the container.

var app = builder.Build();


// Configure the HTTP request pipeline.

app.UseHttpsRedirection();



//app.MapGet(
//{

//});
app.UseRouting();
app.UseCors();
app.MapHub<ChatHubs>("/chatHubs");
app.Run();

