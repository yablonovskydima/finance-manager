package com.finance.manager.dto;

public class FinanceDTO
{
    private Long id;
    private String type;
    private String description;
    private UserDTO owner;

    public FinanceDTO(Long id, String type, String description, UserDTO owner) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.owner = owner;
    }

    public FinanceDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserDTO getOwner() {
        return owner;
    }

    public void setOwner(UserDTO owner) {
        this.owner = owner;
    }
}
