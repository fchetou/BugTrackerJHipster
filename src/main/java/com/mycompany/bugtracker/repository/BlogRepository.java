package com.mycompany.bugtracker.repository;

import com.mycompany.bugtracker.domain.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Blog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    @Query("select blog from Blog blog where blog.user.login = ?#{principal.username}")
    List<Blog> findByUserIsCurrentUser();

    List<Blog> findAllByOrderByNameAsc();

    List<Blog> findByNameIgnoreCaseContainingOrderByNameAsc(String term);
}
