package com.finace.manager.repositories;

import com.finace.manager.entities.Finance;
import com.finace.manager.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinanceRepository extends JpaRepository<Finance, Long>
{
    @Query("""
            SELECT finance FROM Finance finance
            WHERE (finance.owner.username = :#{#username})
            """)
    List<Finance> findAllByOwnerUsername(@Param("username") String username);
}
