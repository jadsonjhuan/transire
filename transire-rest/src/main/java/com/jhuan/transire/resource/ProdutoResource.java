package com.jhuan.transire.resource;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.jhuan.transire.model.Produto;
import com.jhuan.transire.repository.ProdutoRepository;

@RestController
@RequestMapping("/produtos")
@CrossOrigin("*")
public class ProdutoResource {
	
	@Autowired
	private ProdutoRepository pr;
	
	@GetMapping(produces = "application/json")
	public @ResponseBody List<Produto> listAll() {
		return pr.findAll();			
	}
	
	@GetMapping(value = "/{id}")
	public @ResponseBody Produto findById(@PathVariable("id") Long id) {
		return pr.findById(id).get();
	}
	
	@PostMapping
	public Produto createOrUpdate(@RequestBody @Valid Produto produto) {
		return pr.save(produto);
	}
	
	@DeleteMapping(value="/{id}")
	public Produto delete(@PathVariable("id") Long id) {
		Optional<Produto> produtoOp = pr.findById(id);
		if(produtoOp.isPresent()) {
			Produto produto = produtoOp.get();
			pr.deleteById(id);
			return produto;
		} else {
			return null;
		}
	}
	
	
	
}
