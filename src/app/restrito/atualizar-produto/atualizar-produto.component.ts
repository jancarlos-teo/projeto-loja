import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/Produtos.model';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-atualizar-produto',
  templateUrl: './atualizar-produto.component.html',
  styleUrls: ['./atualizar-produto.component.css']
})
export class AtualizarProdutoComponent implements OnInit{

    public produtoId:number = 0;
    public produto: Produto = new Produto(0,"","","",0);
    constructor(private _produtoService: ProdutoService,private _activatedRoute: 
    ActivatedRoute, private _router:Router) {
    this._activatedRoute.params.subscribe(params => this.produtoId = 
    params['id']);
    }
    ngOnInit():void{
    this.listarProduto();
    }
    listarProduto():void{
    this._produtoService.getProduto(this.produtoId)
    .subscribe((res:any) => { console.log(res[0].produto);
    this.produto = new
    Produto(res[0].id,res[0].produto,res[0].descricao,res[0].foto,res[0].preco);
    })
    }
    atualizar(id: number){
    this._produtoService.atualizarProduto(id,this.produto).subscribe(
    produto => {this.produto = new Produto(0,"","","",0)},
    err => {alert("erro ao atualizar")}
    );
    this._router.navigate(["/restrito/lista"]);
    }
    }

