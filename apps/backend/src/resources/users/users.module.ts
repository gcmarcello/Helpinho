import { Module } from "@nestjs/common";
import { UserService } from "./users.service";

@Module({
  controllers: [],
  providers: [UserService],
})
export class UsersModule {}
