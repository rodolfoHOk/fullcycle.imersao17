package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/go-sql-driver/mysql"
	"github.com/rodolfoHOk/fullcycle.imersao17/goapi/internal/database"
	"github.com/rodolfoHOk/fullcycle.imersao17/goapi/internal/services"
	"github.com/rodolfoHOk/fullcycle.imersao17/goapi/internal/webserver"
)

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/imersao17")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	categoryDB := database.NewCategoryDB(db)
	categoryService := services.NewCategoryService(*categoryDB)
	webCategoryHandler := webserver.NewWebCategoryHandler(categoryService)

	productDB := database.NewProductDB(db)
	productService := services.NewProductService(*productDB)
	webProductHandler := webserver.NewWebProductHandler(productService)

	c := chi.NewRouter()
	c.Use(middleware.Logger)
	c.Use(middleware.Recoverer)

	c.Post("/categories", webCategoryHandler.CreateCategory)
	c.Get("/categories", webCategoryHandler.GetCategories)
	c.Get("/categories/{id}", webCategoryHandler.GetCategory)

	c.Post("/products", webProductHandler.CreateProduct)
	c.Get("/products", webProductHandler.GetProducts)
	c.Get("/products/{id}", webProductHandler.GetProduct)
	c.Get("/products/category/{categoryID}", webProductHandler.GetProductsByCategoryID)

	fmt.Println("Server is running on port: 8080")
	http.ListenAndServe(":8080", c)
}
