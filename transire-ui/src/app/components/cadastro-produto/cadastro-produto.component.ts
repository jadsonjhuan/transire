import { ProdutosService } from './../../services/produtos.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  produto = {
    id: null,
    codigoBarras: null,
    descricao: null,
    valor: null,
    imagem: null
  };
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
      valor: null,
      imagem: null
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

  onFileChange(event): void {
    if (event.target.files) {
      if (event.target.files[0].size > 2000000) {
        this.showMessageProduto.emit({ type: 'danger', message: 'Imagem excede o limite de 2MB. Selecione uma nova imagem.' });
        this.produto.imagem = null;
      } else {
        this.produto.imagem = null;
        const reader = new FileReader();
        reader.onloadend = (e: Event) => {
          this.produto.imagem = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
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
