import { Injectable } from '@nestjs/common';
import { Router, Request as ExpressRequest } from 'express';
import { XMLService } from 'src/utils/XML.tools';

@Injectable()
export class StatusService {
  constructor(private readonly xmlService: XMLService) {}

  parseToXML(content: any) {
    return this.xmlService.objectToXml(content);
  }

  async getEndpoints(req: ExpressRequest) {
    const router = req.app._router as Router;
    const endpoints = router.stack
      .map((layer) => {
        if (layer.route) {
          const path = layer.route?.path;
          const method = layer.route?.stack[0].method;
          return { method: method.toUpperCase(), path };
        }
      })
      .filter((item) => item !== undefined);

    const groupedEndpoints = {};

    // Mapear endpoints y verificar su estado de forma asíncrona
    await Promise.all(
      endpoints.map(async (endpoint) => {
        const [category] = endpoint.path.split('/').filter(Boolean);

        if (!groupedEndpoints[category]) {
          groupedEndpoints[category] = {};
        }

        if (!groupedEndpoints[category][endpoint.method]) {
          groupedEndpoints[category][endpoint.method] = [];
        }

        // Comprobar si el endpoint está "up" o no

        // Agregar el objeto con los atributos name e isUp
        groupedEndpoints[category][endpoint.method].push(endpoint.path);
      }),
    );

    // Crear un objeto con los nombres de cada endpoint categorizados
    const categorizedEndpoints = {};
    Object.keys(groupedEndpoints).forEach((category) => {
      categorizedEndpoints[category] = {};
      Object.keys(groupedEndpoints[category]).forEach((method) => {
        categorizedEndpoints[category][method] =
          groupedEndpoints[category][method];
      });
    });

    return categorizedEndpoints;
  }
}
