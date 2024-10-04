<script setup lang="ts">
const prods = [
  {
    name: 'Bebida Fanta Sin Azúcar 591 ml',
    picture:
      'https://storage.googleapis.com/linebox-bucket/product/488949940553.jpg',
    category: 'Bebidas y Licores',
    barcode: '7801610591123',
    position: '0px 0px',
    cost: 1190,
    price: 1300,
  },
  {
    name: 'Endulzante Líquido Stevia Botella, 400 ml',
    picture:
      'https://storage.googleapis.com/linebox-bucket/product/70544610901.jpg',
    category: 'Desayunos y Dulces',
    barcode: '7809558102661',
    position: '-24px 0px',
    cost: 3000,
    price: 3200,
  },
  {
    name: 'Helado Sabor Vainilla Cassata, 1 L',
    picture:
      'https://storage.googleapis.com/linebox-bucket/product/153973128822.jpg',
    category: 'Congelados',
    barcode: '7802710832116',
    position: '-48px 0px',
    cost: 3390,
    price: 3500,
  },
  {
    name: 'Postre Sémola Frambuesa, 140 g',
    picture:
      'https://storage.googleapis.com/linebox-bucket/product/33555934500.jpg',
    category: 'Frescos y Lácteos',
    barcode: '7802900220082',
    position: '-72px 0px',
    cost: 630,
    price: 700,
  },
  {
    name: 'Mantequilla Sin Sal, 250 g',
    picture:
      'https://storage.googleapis.com/linebox-bucket/product/22326082345.jpg',
    category: 'Frescos y Lácteos',
    barcode: '7802900111014',
    position: '-96px 0px',

    cost: 2990,
    price: 3200,
  },
]
</script>

<template>
  <div class="bg-white flex">
    <div class="mx-3 px-3 py-14 border-r">
      <div class="mb-4">
        <h1>Categories</h1>
      </div>

      <p class="text-muted-foreground">Pantry</p>
      <p class="text-sm ms-5 text-muted-foreground">Breads</p>
      <p class="text-muted-foreground">Dairy</p>
      <p class="text-sm ms-5 text-muted-foreground">Milk</p>
      <p class="text-sm ms-5 text-muted-foreground">Yogurts</p>
      <p class="text-muted-foreground">Drinks</p>
      <p class="text-sm ms-5 text-muted-foreground">Water</p>
      <p class="text-sm ms-5 text-muted-foreground">Gas</p>
    </div>
    <div class="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead class="w-[20px]">Price</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-for="p in prods">
            <TableCell class="w-[20px]">
              <div
                :style="`
                  width: 24px;
                  height: 24px;
                  background-image: url('/sprites_1.png');
                  background-position: ${p.position};
                  background-size: auto;
                  transform: scale(2);
                  image-rendering: pixelated;
                `"
              />
            </TableCell>
            <TableCell>{{ p.name }}</TableCell>
            <TableCell>${{ p.cost }}</TableCell>
            <TableCell>${{ p.price }}</TableCell>
          </TableRow>
        </TableBody>

        <!--   <img src="/sprites_1.png" /> -->
      </Table>
    </div>
  </div>
</template>
