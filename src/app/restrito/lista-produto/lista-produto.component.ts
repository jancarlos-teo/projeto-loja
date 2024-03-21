import { Component, OnInit } from '@angular/core';
import {  Router} from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { Produto } from 'src/app/models/Produtos.model';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
 export class ListaProdutoComponent implements OnInit{
  [x: string]: any;

  public produtos : Produto[] = [];
  
  constructor(private _produtoService: ProdutoService, 
    private route: Router, private _loginService: LoginService){}

    ngOnInit():void{
      this.listarProdutos();
      this._loginService.setMostraMenu(false);
    }

    listarProdutos():void {
      this._produtoService.getProdutos()
      .subscribe(
        retornaProduto => {
          this.produtos = retornaProduto.map(
            item => {
return new Produto(
  item.id,
  item.produto,
  item.descricao,
  item.foto,
  item.preco
)

            }
            
          )
        }
      )


    }
excluir (id: number){
this._produtoService.removerProduto(id) .subscribe(
 produto=> {
  this.listarProdutos();
 },
 err => {alert("erro ao excluir")}
);

// windows.locatin.href = "/restrito/lista"
this.route.navigate(["/restrito/lista"]);
}

 }

