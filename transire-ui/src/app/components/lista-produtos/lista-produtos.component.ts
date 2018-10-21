import { ProdutosService } from './../../services/produtos.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  produtos: Array<any>;
  @Output() setProdutoForm = new EventEmitter();
  @Output() showMessage = new EventEmitter();

  activeList = true;

  constructor(private ps: ProdutosService) { }

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.ps.listAll().subscribe(response => this.produtos = response);
    this.activeList = true;
  }

  novoProduto() {
    this.setProdutoForm.emit({});
    this.activeList = false;
  }

  selecionarProduto(id) {
    let produto = {};
    this.ps.findById(id).subscribe(
      response => {
        produto = response;
        this.setProdutoForm.emit(produto);
        this.activeList = false;
      }
    );
  }

  excluirProduto(id) {
    if (confirm('Deseja excluir este registro?')) {
      this.ps.delete(id).subscribe(response => {
        this.showMessage.emit({ type: 'success', message: `Produto "<b>${response.descricao}</b>" removido!` });
        this.listAll();
      });
    }
  }

}
