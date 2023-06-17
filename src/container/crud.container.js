// Clase CRUD
class CRUD {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const createdItem = await this.model.create(data);
      return createdItem;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating item");
    }
  }

  async getAll() {
    try {
      const items = await this.model.findAll();
      return items;
    } catch (error) {
      console.error(error);
      throw new Error("Error retrieving items");
    }
  }

  async getById(id) {
    try {
      const item = await this.model.findByPk(id);
      return item;
    } catch (error) {
      console.error(error);
      throw new Error("Error retrieving item by id");
    }
  }

  async update(id, data) {
    try {
      const updatedItem = await this.model.update(data, {
        where: { id },
      });
      return updatedItem;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating item");
    }
  }

  async delete(id) {
    try {
      const deletedItem = await this.model.destroy({
        where: { id },
      });
      return deletedItem;
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting item");
    }
  }

  async createTable() {
    try {
      await this.model.sync({ force: true });
      console.log(`Table ${this.model.name} created successfully.`);
    } catch (error) {
      console.error(error);
      throw new Error(`Error creating table ${this.model.name}`);
    }
  }
}

export { CRUD as CRUDMySQL };
