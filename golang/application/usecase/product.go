package usecase

import "github.com/matheuss0xf/desafiosgrpc/golang/domain/model"

type ProductUseCase struct {
	ProductRepository model.ProductRepositoryInterface
}

func (p *ProductUseCase) FindProducts() ([]*model.Product, error) {
	return p.ProductRepository.FindAll()
}

func (p *ProductUseCase) CreateProduct(name string, description string, price float32) (*model.Product, error) {
	product, err := model.NewProduct(name, description, price)

	if err != nil {
		return nil, err
	}

	_, err = p.ProductRepository.Create(product)

	if product.ID == 0 {
		return nil, err
	}

	return product, nil
}
