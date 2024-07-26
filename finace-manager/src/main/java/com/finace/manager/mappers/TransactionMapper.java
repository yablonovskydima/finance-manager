package com.finace.manager.mappers;

import com.finace.manager.dto.FinanceDTO;
import com.finace.manager.dto.TransactionDTO;
import com.finace.manager.dto.UserDTO;
import com.finace.manager.entities.Finance;
import com.finace.manager.entities.Transaction;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper
{
    public TransactionDTO toDTO(Transaction transaction) {
        if (transaction == null) {
            return null;
        }

        UserDTO ownerDTO = null;
        if (transaction.getOwner() != null) {
            ownerDTO = new UserDTO(transaction.getOwner().getId(), transaction.getOwner().getUsername());
        }


        FinanceDTO financeDTO = null;
        if (transaction.getFinanceCategory() != null){
            financeDTO = new FinanceDTO(transaction.getFinanceCategory().getId(),
                    transaction.getFinanceCategory().getType(),
                    transaction.getFinanceCategory().getDescription(),
                    ownerDTO);
        }

        return new TransactionDTO(
                transaction.getId(),
                financeDTO,
                transaction.getTransactionType(),
                transaction.getTransactionSum(),
                transaction.getDate(),
                transaction.getDescription(),
                ownerDTO
        );
    }
}
