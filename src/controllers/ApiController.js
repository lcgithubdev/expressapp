import * as dotenv from "dotenv";

dotenv.config();

import zod from "zod";

import pool from "../config/dbConfig.js";

class ApiController {

  constructor() {

    this.sql = pool.promise();

  }

  createTable = async (req, res) => {

    try {

      await this.sql.query(`DROP TABLE IF EXISTS apitokens`, []);

      const [rows] = await this.sql.query(`
      CREATE TABLE apitokens (
          id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
          apitoken longtext NOT NULL,
          status TINYINT NOT NULL DEFAULT '1',
          created_by BIGINT NULL DEFAULT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted_at TIMESTAMP NULL DEFAULT NULL,
          PRIMARY KEY (id)
          ) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci`, []);

      return res.json({ error: false, data: `Table apitokens created successfully!` });

    } catch (error) {

      console.log(error);

      if (error?.issues) {

        const zodErrorData = JSON.parse(error?.message).map((errorMessage) => {

          if (errorMessage.message) return { message: `"${errorMessage?.path}" is ${errorMessage?.message}` };

        })

        return res.json({ error: true, data: zodErrorData[0]?.message });

      } else {

        console.log(error?.message.fields);

        if (error?.message?.fields) return res.json({ error: true, data: error?.message.fields?.message });

        if (error?.message.fields) return res.json({ error: true, data: error?.message.fields?.message });

        return res.json({ error: true, data: error?.message });

      }

    }

  }

  dropTable = async (req, res) => {

    try {

      await this.sql.query(`DROP TABLE IF EXISTS apitokens`, []);

      return res.json({ error: false, data: `Table apitokens deleted successfully` });

    } catch (error) {

      console.log(error);

      if (error?.issues) {

        const zodErrorData = JSON.parse(error?.message).map((errorMessage) => {

          if (errorMessage.message) return { message: `"${errorMessage?.path}" is ${errorMessage?.message}` };

        })

        return res.json({ error: true, data: zodErrorData[0]?.message });

      } else {

        console.log(error?.message.fields);

        if (error?.message?.fields) return res.json({ error: true, data: error?.message.fields?.message });

        if (error?.message.fields) return res.json({ error: true, data: error?.message.fields?.message });

        return res.json({ error: true, data: error?.message });

      }

    }

  }

  test = async (req, res) => {

    try {

      return res.json({ error: false, data: req });

    } catch (error) {

      console.log(error);

      if (error?.issues) {

        const zodErrorData = JSON.parse(error?.message).map((errorMessage) => {

          if (errorMessage.message) return { message: `"${errorMessage?.path}" is ${errorMessage?.message}` };

        })

        return res.json({ error: true, data: zodErrorData[0]?.message });

      } else {

        console.log(error?.message.fields);

        if (error?.message?.fields) return res.json({ error: true, data: error?.message.fields?.message });

        if (error?.message.fields) return res.json({ error: true, data: error?.message.fields?.message });

        return res.json({ error: true, data: error?.message });

      }

    }

  }

}

export default ApiController