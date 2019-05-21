"use strict";

const File = use("App/Models/File");
const Helpers = use("Helpers");
const Drive = use("Drive");

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  async show({ params, response }) {
    const file = await File.find(params.file);
    return response.download(Helpers.tmpPath(`uploads/${file.file}`));
  }

  async store({ request, response }) {
    try {
      if (!request.file("file"))
        return response.status(500).send({ message: "Arquivo não enviado" });

      const upload = request.file("file", { size: "5mb" });

      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath("uploads"), {
        name: fileName
      });

      if (!upload.moved()) {
        console.log("estou aqui");
        return response
          .status(500)
          .send({ message: "Problema ao mover arquivo" });

        //throw upload.error();
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      });

      return response.status(200).send({ file });
    } catch (err) {
      return response.status(err.status).send({ message: err.message });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const file = await File.findOrFail(params.id);
      await Drive.delete(file.file);
      await file.delete();

      return response
        .status(201)
        .send({ message: "Arquivo excluído com sucesso " });
    } catch (err) {
      return response
        .status(err.status)
        .send({ message: "Erro ao excluir o arquivo" });
    }
  }
}

module.exports = FileController;
