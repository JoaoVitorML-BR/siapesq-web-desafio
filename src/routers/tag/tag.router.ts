import { Router } from 'express';
import TagController from '../../controller/tag/tag.controller';
import { AuthGetData } from '../../service/auth.service';

const router = Router();

/**
 * @swagger
 * /tag:
 *   post:
 *     summary: Cria uma nova tag
 *     description: Cria uma nova tag no sistema
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TagSchema'
 *     responses:
 *       201:
 *         description: Tag criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TagResponse'
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Tag já existe
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', AuthGetData, TagController.create);

/**
 * @swagger
 * /tag/all:
 *   get:
 *     summary: Retorna todas as tags
 *     description: Retorna uma lista paginada de todas as tags cadastradas
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limite de resultados por página
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de registros para pular
 *     responses:
 *       200:
 *         description: Lista de tags retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TagListResponse'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/all', AuthGetData, TagController.getAll);

/**
 * @swagger
 * /tag/{id}:
 *   get:
 *     summary: Retorna uma tag específica
 *     description: Retorna os detalhes de uma tag pelo ID
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tag
 *     responses:
 *       200:
 *         description: Tag retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TagResponse'
 *       404:
 *         description: Tag não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', AuthGetData, TagController.getById);

/**
 * @swagger
 * /tag/{id}:
 *   put:
 *     summary: Atualiza uma tag
 *     description: Atualiza os dados de uma tag existente
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TagSchema'
 *     responses:
 *       200:
 *         description: Tag atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TagResponse'
 *       404:
 *         description: Tag não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', AuthGetData, TagController.update);

/**
 * @swagger
 * /tag/{id}:
 *   delete:
 *     summary: Remove uma tag
 *     description: Remove permanentemente uma tag do sistema
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tag
 *     responses:
 *       204:
 *         description: Tag removida com sucesso
 *       404:
 *         description: Tag não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', AuthGetData, TagController.delete);

export default router;
