package com.jhuan.transire.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jhuan.transire.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
