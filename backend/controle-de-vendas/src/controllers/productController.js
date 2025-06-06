import Product from '../models/Product.js';
import Purchase from '../models/Purchase.js';
import User from '../models/User.js';

export class ProductController {
  static async createProduct(req, res) {
    try {
      const { productName, productType, price, details, stock, isAvailable, imageUrl } = req.body;

      const product = await Product.create({
        productName,
        productType,
        price,
        details,
        stock,
        isAvailable,
        imageUrl
      });

      return res.status(201).json({ message: 'Produto criado com sucesso', product });
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      return res.status(500).json({ error: 'Erro ao criar produto', details: error.message });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      return res.status(200).json({ products });
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      return res.status(500).json({ error: 'Erro ao listar produtos', details: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

      return res.status(200).json({ product });
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      return res.status(500).json({ error: 'Erro ao buscar produto', details: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Product.update(req.body, { where: { id } });

      if (updated === 0) return res.status(404).json({ message: 'Produto não encontrado' });

      const product = await Product.findByPk(id);
      return res.status(200).json({ message: 'Produto atualizado com sucesso', product });
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      return res.status(500).json({ error: 'Erro ao atualizar produto', details: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Product.destroy({ where: { id } });

      if (deleted === 0) return res.status(404).json({ message: 'Produto não encontrado' });

      return res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      return res.status(500).json({ error: 'Erro ao deletar produto', details: error.message });
    }
  }

  // Relatório de compradores por produto
  static async buyersReport(req, res) {
    try {
      const productsWithBuyers = await Product.findAll({
        include: {
          model: Purchase,
          include: {
            model: User,
            attributes: ['id', 'name', 'email']
          }
        }
      });

      return res.status(200).json({ productsWithBuyers });
    } catch (error) {
      console.error("Erro ao gerar relatório de compradores:", error);
      return res.status(500).json({ error: 'Erro ao gerar relatório de compradores', details: error.message });
    }
  }
}
