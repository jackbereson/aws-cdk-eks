import Axios from "axios";
import { ErrorHelper } from ".";

const host = `https://console.ather.finance`;

export class PortainerHelper {
  jwt = null;
  constructor() {}

  auth = () => {
    return Axios.post(
      `${host}/api/auth`,
      { username: USERNAME, password: PASS },
      { headers: { "Content-Type": "application/json" } }
    )
      .then((res) => {
        // console.log("res", res.data.jwt);
        this.jwt = res.data.jwt;
      })
      .catch((err) => {
        console.log("error", err);
        throw ErrorHelper.badToken();
      });
  };

  getServices = async (): Promise<Service[]> => {
    try {
      const response = await Axios.get(`${host}/api/endpoints/1/docker/services`, {
        headers: { "Content-Type": "application/json", authorization: `Bearer ${this.jwt}` },
      });

      return response.data;
    } catch (error) {
      console.log("error", error);
      throw ErrorHelper.mgQueryFailed("Service");
    }
  };

  getContainers = async (): Promise<Container[]> => {
    try {
      const response = await Axios.get(`${host}/api/endpoints/1/docker/containers/json?all=1`, {
        headers: { "Content-Type": "application/json", authorization: `Bearer ${this.jwt}` },
      });

      return response.data;
    } catch (error) {
      console.log("error", error);
      throw ErrorHelper.mgQueryFailed("Container");
    }
  };

  getLogs = async (id: string) => {
    try {
      const response = await Axios.get(
        `${host}/api/endpoints/1/docker/containers/${id}/logs?since=0&stderr=1&stdout=1&tail=100&timestamps=0`,
        {
          headers: { "Content-Type": "application/json", authorization: `Bearer ${this.jwt}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("error", error);
      throw ErrorHelper.mgQueryFailed("Container Log");
    }
  };

  restart = async (id: string) => {
    console.log("restart", id);
    try {
      await Axios.post(
        `${host}/api/endpoints/1/docker/containers/${id}/restart`,
        {},
        {
          headers: { "Content-Type": "application/json", authorization: `Bearer ${this.jwt}` },
        }
      );
    } catch (error) {
      console.log("error", error);
      throw ErrorHelper.mgQueryFailed("Container Log");
    }
  };

  kill = async (id: string) => {
    // https://console.ather.finance/api/endpoints/1/docker/containers/69dbf96d467f46cb88a6e9305bfe8fe1e4807f5cbd4ed5f556bb035d3194491d/kill
    console.log("kill", id);
    try {
      await Axios.post(
        `${host}/api/endpoints/1/docker/containers/${id}/kill`,
        {},
        {
          headers: { "Content-Type": "application/json", authorization: `Bearer ${this.jwt}` },
        }
      );
    } catch (error) {
      console.log("error", error);
      throw ErrorHelper.mgQueryFailed("Container Log");
    }
  };

  delete = async (id: string) => {
    // https://console.ather.finance/api/endpoints/1/docker/containers/69dbf96d467f46cb88a6e9305bfe8fe1e4807f5cbd4ed5f556bb035d3194491d?force=true&v=0
    console.log("delete", id);
    try {
      await Axios.delete(`${host}/api/endpoints/1/docker/containers/${id}?force=true&v=0`, {
        headers: { "Content-Type": "application/json", authorization: `Bearer ${this.jwt}` },
      });
    } catch (error) {
      console.log("error", error);
      throw ErrorHelper.mgQueryFailed("Container Log");
    }
  };
}

type Service = {
  CreatedAt: Date;
  Endpoint: {
    Ports: {
      Protocol: string;
      PublishMode: string;
      PublishedPort: number;
      TargetPort: number;
    }[];
    Spec: {
      Mode: string;
      Ports: {
        Protocol: string;
        PublishMode: string;
        PublishedPort: number;
        TargetPort: number;
      }[];
    };
    VirtualIPs: {
      Addr: string;
      NetworkID: string;
    }[];
  };
  ID: string;
  Portainer: {
    ResourceControl: {
      Id: number;
      ResourceId: string;
      SubResourceIds: any[];
      Type: number;
      UserAccesses: any[];
      TeamAccesses: any[];
      Public: boolean;
      AdministratorsOnly: boolean;
      System: boolean;
    };
  };
  Spec: {
    EndpointSpec: {
      Mode: string;
      Ports: {
        Protocol: string;
        PublishMode: string;
        PublishedPort: number;
        TargetPort: number;
      }[];
    };
    Labels: {
      "com.docker.stack.image": string;
      "com.docker.stack.namespace": string;
    };
    Mode: {
      Replicated: {
        Replicas: number;
      };
    };
    Name: string;
    TaskTemplate: {
      ContainerSpec: {
        Env: string[];
        Image: string;
        Isolation: string;
        Labels: {
          "com.docker.stack.namespace": string;
        };
        Mounts: {
          Source: string;
          Target: string;
          Type: string;
          VolumeOptions: any;
        }[];
        Privileges: {
          CredentialSpec: any;
          SELinuxContext: any;
        };
      };
      ForceUpdate: number;
      LogDriver: {
        Name: string;
      };
      Networks: [
        {
          Aliases: string[];
          Target: string;
        }
      ];
    };
  };
  UpdatedAt: Date;
  Version: {
    Index: number;
  };
};

export enum ContainereStates {
  starting = "starting",
  healthy = "healthy",
  unhealthy = "unhealthy",
  running = "running",
}

type Container = {
  Command: string;
  Created: number;
  HostConfig: {
    NetworkMode: string;
  };
  Id: string;
  Image: string;
  ImageID: string;
  Labels: {
    "com.docker.stack.namespace": string;
    "com.docker.swarm.node.id": string;
    "com.docker.swarm.service.id": string;
    "com.docker.swarm.service.name": string;
    "com.docker.swarm.task": string;
    "com.docker.swarm.task.id": string;
    "com.docker.swarm.task.name": string;
  };
  Mounts: any[];
  Names: string[];
  NetworkSettings: {
    Networks: any;
  };
  Portainer: {
    Agent: {
      NodeName: string;
    };
    ResourceControl: {
      Id: number;
      ResourceId: string;
      SubResourceIds: any[];
      Type: 6;
      UserAccesses: any[];
      TeamAccesses: any[];
      Public: boolean;
      AdministratorsOnly: boolean;
      System: boolean;
    };
  };
  Ports: {
    PrivatePort: number;
    Type: string;
  }[];
  State: ContainereStates;
  Status: string;
};

const USERNAME = "nguyetla2021@gmail.com";
const PASS = "Ather@2021";

export enum MICRO_SERVICES {
  CLAIM_TOKEN = "claim-token",
  BUY_TOKEN = "buy-token",
  AIRDROP = "airdrop",
  BUY_TOKEN_SOCKET = "socket-dev",
  LIST_NFT = "list-nft",
}
