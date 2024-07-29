package com.finance.manager.mappers;

import com.finance.manager.dto.FinanceDTO;
import com.finance.manager.dto.UserDTO;
import com.finance.manager.entities.Finance;
import org.springframework.stereotype.Component;

@Component
public class FinanceMapper
{
    public FinanceDTO toDTO(Finance finance) {
        if (finance == null) {
            return null;
        }

        UserDTO ownerDTO = null;
        if (finance.getOwner() != null) {
            ownerDTO = new UserDTO(finance.getOwner().getId(), finance.getOwner().getUsername());
        }

        return new FinanceDTO(
                finance.getId(),
                finance.getType(),
                finance.getDescription(),
                ownerDTO
        );
    }

}
