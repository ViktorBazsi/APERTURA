export function createCrudController(service) {
  return {
    list: async (req, res) => {
      const items = await service.list(req.query);
      res.json(items);
    },
    getById: async (req, res) => {
      const item = await service.getById(req.params.id);
      res.json(item);
    },
    create: async (req, res) => {
      const item = await service.create(req.body);
      res.status(201).json(item);
    },
    update: async (req, res) => {
      const item = await service.update(req.params.id, req.body);
      res.json(item);
    },
    remove: async (req, res) => {
      await service.remove(req.params.id);
      res.status(204).send();
    },
  };
}
