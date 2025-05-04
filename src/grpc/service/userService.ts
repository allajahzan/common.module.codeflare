import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const packageDefinition = protoLoader.loadSync(
    path.join(__dirname, "..", "proto", "user.proto")
);

export const userProto = grpc.loadPackageDefinition(packageDefinition).user;