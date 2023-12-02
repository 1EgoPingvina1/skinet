using API.Extensions;
using API.Middleware;
using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
var app = builder.Build();
// Configure the HTTP request pipeline.
app.UseMiddleware<ExeptionMiddleWare>();

app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseSwagger();
app.UseSwaggerUI();

app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<StoreContext>();
var Identitycontext = services.GetRequiredService<AppIdentityDbContext>();
var userManager = services.GetRequiredService<UserManager<AppUser>>();
var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
var logger = services.GetRequiredService<ILogger<Program>>();
try
{
    await context.Database.MigrateAsync();
    await Identitycontext.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context);
    await AppIdentityDbContextSeed.SeedUsersAsync(userManager);
    await AppIdentityDbContextSeed.SeedUserRoleAsync(roleManager);
}
catch (Exception ex)
{
    logger.LogError(ex, "An error occured during migration");
}

app.Run();