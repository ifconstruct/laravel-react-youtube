<?php

namespace App\Http\Controllers;

use App\Models\Items;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function storeItems(Request $request)
    {
        $items = $request->get("items");
        $playlist = $request->get('playlist');
        $res = Items::where('playlist',$playlist)->first();
        if($res) {
            $item = Items::where('playlist',$playlist) ->update(['items' => $items]);
        }else {
            $item = new Items();
            $item->playlist = $playlist;
            $item->items = $items;
            $item->save();
        }
        return response()->json(['success' => $item]);
    }
    public function loadItems(Request $request)
    {
        $items = Items::where('playlist',1)->get();
        return response()->json($items);
    }
}
