<script>
  import { afterPageLoad } from "@roxi/routify";

  let observer = null;

  if (typeof IntersectionObserver !== "undefined") {
    observer = new IntersectionObserver(OnIntersection, {});
  }

  let links = [];
  let activeIDs = new Set();

  if (observer) {
    $afterPageLoad((_page) => {
      setTimeout(() => {
        links = document.querySelectorAll("#content h2");
        links.forEach((link) => observer.observe(link));
      }, 0);
    });
  }

  function OnIntersection(values) {
    for (const value of values) {
      const target = value.target;
      if (value.isIntersecting) {
        activeIDs.add(target.id);
      } else {
        activeIDs.delete(target.id);
      }
      activeIDs = activeIDs;
    }
  }
</script>

<style>
  .active {
    @apply border-primary;
  }
</style>

{#if links.length}
  <div class="hidden lg:block fixed right-0 top-0 m-12 mt-24 z-20">
    <div class="uppercase text-xs font-bold text-gray-400 mb-4">Contents</div>
    {#each links as link}
      <div
        class:active={activeIDs.has(link.id)}
        class="text-sm p-1 pl-4 font-bold text-gray-500 hover:text-primary border-l-2">
        <a href={'#' + link.id}>{link.innerText}</a>
      </div>
    {/each}
  </div>
{/if}
