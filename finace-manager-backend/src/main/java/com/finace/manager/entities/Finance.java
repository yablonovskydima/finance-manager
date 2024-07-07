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

    public Finance(Long id, String name, String description) {
        this.id = id;
        this.type = name;
        this.description = description;
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
}
