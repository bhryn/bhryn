<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Website architecture
- Keep shared navigation and footer in the root shell via network site components so all public pages share the selected design.
- Keep About Us and Leadership Board as homepage anchors, with separate Events and Contact routes, because this is the requested navigation structure.
- Keep draft content visibly marked and do not enable contact submission until real destinations are supplied, to avoid false membership confirmations.
