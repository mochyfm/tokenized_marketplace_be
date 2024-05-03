import { Injectable, Logger } from '@nestjs/common';
import { DockerService } from './docker.setup';

@Injectable()
export class StatusCheckService {
  private readonly logger = new Logger(StatusCheckService.name);

  constructor(private readonly dockerService: DockerService) {}

  async checkStatus() {
    const isDockerContainerRunning =
      await this.dockerService.isContainerRunning();

    if (!isDockerContainerRunning) {
      this.logger.error('Docker container is not active, restarting.');
      const dockerRestartSuccess = await this.dockerService.restartContainer();

      if (!dockerRestartSuccess) {
        process.exit(1);
      }
    }
  }
}
