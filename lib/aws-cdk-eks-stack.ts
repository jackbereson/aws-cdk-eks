import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkEksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const vpc = new ec2.Vpc(this, 'MyVpc', {
    //     natGateways: 0,
    // });

    // const securityGroup = new ec2.SecurityGroup(this, 'sg', {
    //     vpc: vpc
    // });

    // const ec2Instance = new ec2.Instance(this,'ec2Instance', {
    //     instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
    //     machineImage: new ec2.AmazonLinuxImage(),
    //     vpc: vpc,
    //     securityGroup
    // })

    const vpc = new ec2.Vpc(this, 'Ec2Vpc', {
      maxAzs: 2,
    });

    // Tạo cụm EKS
    const cluster = new eks.Cluster(this, 'MyCluster', {
      vpc,
      version: eks.KubernetesVersion.V1_23,
    });

    const t2Micro = ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)
    // Tạo worker node group
    cluster.addNodegroupCapacity('MyNodeGroup', {
      instanceTypes: [t2Micro],
      desiredSize: 2,
    });
  }
}

//aws eks update-kubeconfig --name MyCluster --region ap-southeast-1