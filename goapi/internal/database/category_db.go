package database

import (
	"database/sql"

	"github.com/rodolfoHOk/fullcycle.imersao17/goapi/internal/entities"
)

type CategoryDB struct {
	db *sql.DB
}

func NewCategoryDB(db *sql.DB) *CategoryDB {
	return &CategoryDB{db: db}
}

func (cd *CategoryDB) CreateCategory(category *entities.Category) (string, error) {
	_, err := cd.db.Exec("INSERT INTO categories (id, name) VALUES (?, ?)", category.ID, category.Name)
	if err != nil {
		return "", err
	}
	return category.ID, nil
}

func (cd *CategoryDB) GetCategories() ([]*entities.Category, error) {
	rows, err := cd.db.Query("SELECT id, name FROM categories")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []*entities.Category
	for rows.Next() {
		var category entities.Category
		if err := rows.Scan(&category.ID, &category.Name); err != nil {
			return nil, err
		}
		categories = append(categories, &category)
	}
	return categories, nil
}

func (cd *CategoryDB) GetCategory(id string) (*entities.Category, error) {
	var category entities.Category
	err := cd.db.QueryRow("SELECT id, name FROM categories WHERE id = ?", id).Scan(&category.ID, &category.Name)
	if err != nil {
		return nil, err
	}
	return &category, nil
}
