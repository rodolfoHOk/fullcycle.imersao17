package webserver

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rodolfoHOk/fullcycle.imersao17/goapi/internal/entities"
	"github.com/rodolfoHOk/fullcycle.imersao17/goapi/internal/services"
)

type WebProductHandler struct {
	ProductService *services.ProductService
}

func NewWebProductHandler(productService *services.ProductService) *WebProductHandler {
	return &WebProductHandler{ProductService: productService}
}

func (wph *WebProductHandler) CreateProduct(w http.ResponseWriter, r *http.Request) {
	var product entities.Product
	err := json.NewDecoder(r.Body).Decode(&product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	result, err := wph.ProductService.CreateProduct(product.Name, product.Description, product.Price, product.CategoryID, product.ImageURL)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(result)
}

func (wph *WebProductHandler) GetProducts(w http.ResponseWriter, r *http.Request) {
	products, err := wph.ProductService.GetProducts()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(products)
}

func (wph *WebProductHandler) GetProduct(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "id is required", http.StatusBadRequest)
		return
	}

	product, err := wph.ProductService.GetProduct(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(product)
}

func (wph *WebProductHandler) GetProductsByCategoryID(w http.ResponseWriter, r *http.Request) {
	categoryID := chi.URLParam(r, "categoryID")
	if categoryID == "" {
		http.Error(w, "categoryID is required", http.StatusBadRequest)
		return
	}

	products, err := wph.ProductService.GetProductsByCategoryID(categoryID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(products)
}
