<script lang="ts">
  export let totalColumns = 4;
  export let borderNone = true;
</script>

{#each { length: 3 } as _}
  <tr>
    {#each { length: totalColumns } as _}
      <td class:!border-none={borderNone}>
        <div class="skeleton-loader" style="width: 100%; height: 16px;"></div>
      </td>
    {/each}
  </tr>
{/each}
