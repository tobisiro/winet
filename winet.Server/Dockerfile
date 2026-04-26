# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081
ENV ASPNETCORE_URLS=http://+:8080


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release

# Install Node.js for frontend build
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

WORKDIR /src
COPY ["winet.Server/winet.Server.csproj", "winet.Server/"]
COPY ["winet.client/winet.client.esproj", "winet.client/"]
RUN dotnet restore "./winet.Server/winet.Server.csproj"
COPY . .

# 1. Build frontend
WORKDIR "/src/winet.client"
RUN npm install
RUN npm run build

# 2. Build backend
WORKDIR "/src/winet.Server"
RUN dotnet build "./winet.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# 3. Publish backend
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./winet.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Stage final: copy everything to the final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# 4. Explicitly copy compiled frontend to wwwroot if not handled by publish
COPY --from=build /src/winet.client/dist ./wwwroot

ENTRYPOINT ["dotnet", "winet.Server.dll"]
