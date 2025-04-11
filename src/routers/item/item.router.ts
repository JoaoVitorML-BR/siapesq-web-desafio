import { Router } from 'express';
import ItemController from '../../controller/item/item.controller';
import { upload } from '../../utils/image.utils';

import RelationItemUserController from '../../controller/relation/item_user';
import RelationItemTagController from '../../controller/relation/item_tag';
import { AuthGetData } from '../../service/auth.service';

const router = Router();

/**
 * @swagger
 * /item:
 *   post:
 *     summary: Create a new item
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: file
 *                 format: uri
 *     responses:
 *       201:
 *         description: Item created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', AuthGetData, upload, ItemController.create);

/**
 * @swagger
 * /item/{id}:
 *   put:
 *     summary: Update an item by ID
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The item ID to update
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', AuthGetData, upload, ItemController.update);

/**
 * @swagger
 * /item/all:
 *   get:
 *     summary: Get all items
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: The starting point of the items to return
 *     responses:
 *       200:
 *         description: A list of items
 *       500:
 *         description: Internal server error
 */
router.get('/all', AuthGetData, ItemController.getAll);

/**
 * @swagger
 * /item/{id}:
 *   get:
 *     summary: Get an item by ID
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The item ID to retrieve
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: The item details
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', AuthGetData, ItemController.getById);

/**
 * @swagger
 * /item/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The item ID to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', AuthGetData, ItemController.delete);

// item_user relations

/**
 * @swagger
 * /item/relations/all/item/user:
 *   get:
 *     summary: Get all item-user relations
 *     tags: [Item User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of item-user relations
 *       500:
 *         description: Internal server error
 */
router.get('/relations/all/item/user', AuthGetData, RelationItemUserController.getAll);

/**
 * @swagger
 * /item/relations/item/{item_id}/user/{user_id}:
 *   get:
 *     summary: Get a specific item-user relation
 *     tags: [Item User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         description: The item ID
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: The item-user relation details
 *       404:
 *         description: Relation not found
 *       500:
 *         description: Internal server error
 */
router.get('/relations/item/:item_id/user/:user_id', AuthGetData, RelationItemUserController.getRelationById);

/**
 * @swagger
 * /item/relations/items/{item_id}/users/{user_id}:
 *   post:
 *     summary: Create an item-user relation
 *     tags: [Item User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         description: The item ID
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               relation_type:
 *                 type: string
 *                 enum: ['CREATOR', 'RECEIVER']
 *     responses:
 *       201:
 *         description: Relation created successfully
 *       400:
 *         description: Invalid relation type
 *       409:
 *         description: Relation already exists
 *       500:
 *         description: Internal server error
 */
router.post('/relations/items/:item_id/users/:user_id', AuthGetData, RelationItemUserController.create);

// item_tag relations

/**
 * @swagger
 * /item/relations/all/item/tag:
 *   get:
 *     summary: Get all item-tag relations
 *     tags: [Item Tag]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of item-tag relations
 *       500:
 *         description: Internal server error
 */
router.get('/relations/all/item/tag', AuthGetData, RelationItemTagController.getAll);

/**
 * @swagger
 * /item/relations/item/{item_id}/tag/{tag_id}:
 *   get:
 *     summary: Get a specific item-tag relation
 *     tags: [Item Tag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         description: The item ID
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: tag_id
 *         required: true
 *         description: The tag ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: The item-tag relation details
 *       404:
 *         description: Relation not found
 *       500:
 *         description: Internal server error
 */
router.get('/relations/item/:item_id/tag/:tag_id', AuthGetData, RelationItemTagController.getRelationById);

/**
 * @swagger
 * /item/relations/items/{item_id}/tags/{tag_id}:
 *   post:
 *     summary: Create an item-tag relation
 *     tags: [Item Tag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         description: The item ID
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: tag_id
 *         required: true
 *         description: The tag ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Relation created successfully
 *       404:
 *         description: Item or Tag not found
 *       409:
 *         description: Relation already exists
 *       500:
 *         description: Internal server error
 */
router.post('/relations/items/:item_id/tags/:tag_id', AuthGetData, RelationItemTagController.create);

export default router;
