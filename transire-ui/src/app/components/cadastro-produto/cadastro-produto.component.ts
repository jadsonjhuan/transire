import { ProdutosService } from './../../services/produtos.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  produto = {};
  @Output() showMessageProduto = new EventEmitter();
  @Output() updateList = new EventEmitter();

  activeForm = false;

  constructor(private ps: ProdutosService) { }

  ngOnInit() {
    this.newProduto();
  }

  newProduto() {
    this.produto = {
      id: null,
      codigoBarras: null,
      descricao: null,
      valor: null
    };
  }

  save() {
    this.ps.createOrUpdate(this.produto).subscribe(
      response => {
        this.produto = response;
        this.showMessageProduto.emit({ type: 'success', message: 'Produto salvo com sucesso!' });
        this.activeForm = false;
        this.updateList.emit();
        this.newProduto();
      }
    );
  }

  cancel() {
    this.activeForm = false;
    this.newProduto();
    this.updateList.emit();
  }

  setProduto(produto) {
    this.activeForm = true;
    this.produto = produto;
  }

}
