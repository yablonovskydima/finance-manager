package com.finace.manager.entities;

import jakarta.persistence.*;

@Entity
@Table(
        name = "finances",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "type", name = "uq_finances_type")
        }
)
public class Finance
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "type", nullable = false, length = 100, unique = true)
    private String type;

    @Column(name = "description", nullable = false, length = 200)
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id", foreignKey = @ForeignKey(name = "fk_user_finance"))
    private User owner;

    public Finance(Long id, String type, String description, User owner) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.owner = owner;
    }

    public Finance() {
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

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
