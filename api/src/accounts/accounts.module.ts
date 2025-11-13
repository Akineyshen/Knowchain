import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { SessionGuard } from './guards/session.guard';
import { OptionalSessionGuard } from './guards/optional-session.guard';

@Module({
    controllers: [AccountsController],
    providers: [AccountsService, SessionGuard, OptionalSessionGuard],
    exports: [AccountsService, SessionGuard, OptionalSessionGuard],
})
export class AccountsModule {}